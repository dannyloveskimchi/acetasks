from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
from fastapi.middleware.cors import CORSMiddleware
import uuid
from datetime import datetime, timezone

app = FastAPI()


class Assignment(BaseModel):
    course_name: str
    assignment_name: str
    due_at: str
    url: str
    points: int


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Token(BaseModel):
    api_key: str
    base_url: str


@app.post("/validate_token/")
def validate_token(token: Token) -> bool:
    if token is None:
        return False
    response = requests.get(
        f"https://{token.base_url}.instructure.com/api/v1/users/self/course_nicknames",
        headers={"Authorization": f"Bearer {token.api_key}"},
    )
    if response.status_code == 200:
        return True
    else:
        return False


assignments = []


@app.post("/items/")
def get_items(token: Token):
    existing_ids = [
        item["id"] for item in assignments if item["token"] == token.api_key
    ]
    response = requests.get(
        f"https://{token.base_url}.instructure.com/api/v1/users/self/todo",
        headers={"Authorization": f"Bearer {token.api_key}"},
    )
    items = response.json()
    for item in items:
        if (
            item["assignment"]["due_at"] is not None
            and item["assignment"]["id"] not in existing_ids
        ):
            assignments.append(
                {
                    "id": item["assignment"]["id"],
                    "token": token.api_key,
                    "course_name": item["context_name"],
                    "assignment_name": item["assignment"]["name"],
                    "due_at": item["assignment"]["due_at"],
                    "url": item["assignment"]["html_url"],
                    "points": item["assignment"]["points_possible"],
                    "days_due_in": (
                        datetime.fromisoformat(
                            item["assignment"]["due_at"].replace("Z", "+00:00")
                        )
                        - datetime.now(timezone.utc)
                    ).days,
                }
            )
    return_items = sorted(
        assignments,
        key=lambda k: (
            k["token"] == token.api_key,
            datetime.fromisoformat(k["due_at"]),
            -k["points"],
        ),
    )

    return {"items": return_items}


@app.post("/items/")
def add_item(api_key: str, item: Assignment):
    assignments.append({**item, "token": api_key, "id": uuid.uuid4()})
    return item
