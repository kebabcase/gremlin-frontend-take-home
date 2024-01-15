import { json } from "react-router-dom";

export async function action() {
  throw json({}, { status: 500, statusText: "Fail API button pressed" });
}
