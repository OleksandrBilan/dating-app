import { useEffect, useState } from "react";
import s from "./style.module.css";
import { Button } from "react-bootstrap";

export function ImageUploadForm({ previewImageUrl, onSubmit, onSkip }) {
  const [image, setImage] = useState();
  const [previewUrl, setPreviewUrl] = useState();

  useEffect(() => {
    setPreviewUrl(previewImageUrl);
  }, [previewImageUrl]);

  function onFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(file);
        setPreviewUrl(reader.result);
      };
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (image) {
      onSubmit(image);
    } else {
      alert("No files selected");
    }
  }

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit} className={s.imageUpload}>
        <div>
          {previewUrl && (
            <img
              src={previewUrl}
              style={{ maxWidth: "100%", maxHeight: "300px" }}
              alt="Selected image"
            />
          )}
        </div>
        <div>
          <label className={s.imageUploadLabel}>
            {image ? (
              <span className={s.imageUploadFilename}>{image.name}</span>
            ) : (
              <span>Choose an image</span>
            )}
            <input
              type="file"
              name="image"
              className={s.imageUploadInput}
              onChange={onFileSelect}
            />
          </label>
        </div>
        <div className={s.buttons}>
          <Button
            type="submit"
            variant="primary"
            className={s.ImageUploadButton}
          >
            Upload
          </Button>
          {onSkip && (
            <Button variant="secondary" onClick={onSkip}>
              Skip
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
