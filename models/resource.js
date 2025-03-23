const { Schema, Model } = require("mongoose");

const resourceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["file", "folder"], // Added enum for options
    },
    fileUrl: {
      type: String,
      required: false,
    },
    fileType: {
      type: String,
      required: true,
      enum: [
        "png",
        "jpg",
        "jpeg",
        "svg",
        "webp",
        "pdf",
        "docx",
        "doc",
        "ppt",
        "pptx",
        "jpg",
        "jpeg",
        "gif",
        "txt",
        "csv",
        "xlsx",
        "xls",
        "json",
        "mp4",
        "mp3",
        "zip",
        "rar",
        null,
      ],
    },
    parentID: [
      {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "Resource",
      },
    ],
    fileCount: {
      type: Number,
      required: false,
      default: 0,
    },
    folderCount: {
      type: Number,
      required: false,
      default: 0,
    },
    creatorID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "suspended", "deleted"],
      default: "active",
    },
    size: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Resource = new Model("Resource", resourceSchema, "Resources");

module.exports = Resource;
