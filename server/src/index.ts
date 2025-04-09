import express, { Request, Response, NextFunction } from 'express';
import {HttpError} from "./error";
import { StructError } from 'superstruct';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
});

app.get('/', (req: Request, res: Response) => {
  throw new Error('An error occurred');
});

app.use((err: HttpError|StructError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof StructError) {
    err = new HttpError(`Bad value for field ${err.key}`, 400);
  }
  res.status(err.status ?? 500).send(err.message);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});