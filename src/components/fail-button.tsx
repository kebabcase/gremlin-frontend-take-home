import { Form } from "react-router-dom";

export function FailButton() {
  return (
    <Form id="fail-api-form" role="button" method="post" action="fail-api">
      <button
        id="fail-api"
        type="submit"
        className="p-2 border border-black rounded hover:bg-[#f7f7f7]"
      >
        Fail API
      </button>
    </Form>
  );
}
