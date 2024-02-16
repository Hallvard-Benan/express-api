import { Router } from "express";
import { reviewFilterValidationSchema } from "../utils/validationSchemas.mjs";
import { validationResult, matchedData, checkSchema } from "express-validator";
const router = Router();

router.get("/", checkSchema(reviewFilterValidationSchema), (req, res) => {
  res.cookie("This is a cookie", "hello", { maxAge: 10000 });

  const {
    query: { sortBy, sortOrder, filter, value },
  } = req;
  const result = validationResult(req);

  if (!result.isEmpty()) {
    console.log(result);
    return res.status(400).send({ errors: result.array() });
  }

  const data = matchedData(req);

  console.log("matched data>>> ", data);

  let reviewResponse = [...reviews];
  if (filter && value) {
    reviewResponse = reviewResponse.filter((review) =>
      review[filter].includes(value)
    );
  }

  if (sortBy && sortOrder)
    if (sortOrder === "asc") {
      reviewResponse.sort((a, b) => a[sortBy] - b[sortBy]);
    } else if (sortOrder === "desc")
      reviewResponse.sort((b, a) => a[sortBy] - b[sortBy]);

  res.send(reviewResponse);
});

export default router;
