import React from 'react';
import QueryForm from './QueryForm';
import LanguageSwitch from './LanguageSwitch';

export default function SideMenu() {
  return (
    <>
      <LanguageSwitch/>
      <QueryForm/>
    </>
  );
}
