import os
import uuid
from fastapi import UploadFile
from pathlib import Path

TEMP_DIR = Path("temp_uploads")
TEMP_DIR.mkdir(exist_ok=True)

def save_upload_file(upload_file: UploadFile) -> str:
    """
    Saves an uploaded file to a temporary directory and returns its local path.
    """
    file_extension = Path(upload_file.filename).suffix
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = TEMP_DIR / unique_filename

    with open(file_path, "wb") as buffer:
        buffer.write(upload_file.file.read())

    return str(file_path)

def delete_file(file_path: str):
    """
    Deletes a temporary file after use.
    """
    try:
        os.remove(file_path)
    except FileNotFoundError:
        pass
