const bodyJsonSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    email: { type: "string", format: "email" },
  },
  required: ["name", "email"],
};

const paramsJsonSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
  },
  required: ["id"],
};

const errorResponseSchema = {
  type: "object",
  properties: {
    message: { type: "string" },
  },
};

const getAllSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: bodyJsonSchema,
      },
    },
  },
};

const getSingleSchema = {
  schema: {
    params: paramsJsonSchema,
    response: {
      200: bodyJsonSchema,
      404: errorResponseSchema,
    },
  },
};

const storeSchema = {
  schema: {
    body: bodyJsonSchema,
    response: {
      200: bodyJsonSchema,
    },
  },
};

const updateSchema = {
  schema: {
    params: paramsJsonSchema,
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string", format: "email" },
      },
    },
    response: {
      200: bodyJsonSchema,
      404: errorResponseSchema,
    },
  },
};

const deleteSchema = {
  schema: {
    params: paramsJsonSchema,
    response: {
      204: { type: "null" },
      404: errorResponseSchema,
    },
  },
};

module.exports = {
  getAllSchema,
  getSingleSchema,
  storeSchema,
  updateSchema,
  deleteSchema,
};
