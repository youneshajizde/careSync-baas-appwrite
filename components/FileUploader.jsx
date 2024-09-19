"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
function FileUploader({ files, onChange }) {
  const onDrop = useCallback((acceptedFiles) => {
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="file-upload" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop your Verifications</p>
      )}
    </div>
  );
}

export default FileUploader;
