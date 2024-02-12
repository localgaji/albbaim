import { useAtom } from 'jotai';
import { memberAtom } from 'pages/SchedulePage/states';
import { useState } from 'react';
import { Worker } from 'types/schedule';

export const useSelectMember = () => {
  const [member, setMember] = useAtom(memberAtom);

  const [isOpen, setIsOpen] = useState(false);

  const dropdownOnClick = () => {
    setIsOpen((prev) => !prev);
  };

  const contentOnClick = (userinfo: Worker) => {
    setMember({ ...userinfo });
    setIsOpen(false);
  };

  return { member, isOpen, dropdownOnClick, contentOnClick };
};
