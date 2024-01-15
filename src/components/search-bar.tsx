import { useCallback, useState } from "react";
import { Form, useSearchParams } from "react-router-dom";

interface Props {
  q: string | null;
}

export function SearchBar({ q }: Props) {
  const [, setSearchParams] = useSearchParams();

  const [valueChange, setValueChange] = useState<NodeJS.Timeout | null>(null);

  const handleValueChange = useCallback(
    (value: string) => {
      if (valueChange != null) clearTimeout(valueChange);

      setValueChange(
        setTimeout(() => {
          setSearchParams({ q: value });
          setValueChange(null);
        }, 150)
      );
    },
    [valueChange, setSearchParams]
  );

  return (
    <Form id="search-form" role="search">
      <input
        id="q"
        data-testid="search-input-field"
        aria-label="Search NPM packages"
        placeholder="Search"
        type="search"
        name="q"
        className="dark:bg-[#323232]"
        defaultValue={q ?? undefined}
        onChange={(e) => handleValueChange(e.target.value)}
      />
    </Form>
  );
}
