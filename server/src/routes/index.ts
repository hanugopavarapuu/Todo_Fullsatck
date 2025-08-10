import { Router } from "express";
const route = Router();
import noteroute from "./note";

route.use("/note", noteroute);

export default route;