import React, { useState } from 'react';

interface StringIndex {
  [index: string]: string;
}

const useFormOnBlurUpdate = <T extends StringIndex>(initial: T, validator: (prev: string) => string = (e) => e) => {
  const [val, setVal] = useState(initial);
  const [final, setFinal] = useState(initial);

  const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setVal((prev) => ({ ...prev, [event.target.id]: validator(event.target.value) }));
    setFinal((prev) => ({ ...prev, [event.target.id]: validator(event.target.value) }));
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVal((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  return { val, final, onBlurHandler, onChangeHandler };
};

export default useFormOnBlurUpdate;
