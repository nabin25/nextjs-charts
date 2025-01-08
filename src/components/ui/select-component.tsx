"use client";
import { useTheme } from "next-themes";
import { ReactNode, useState } from "react";
import { default as ReactSelect } from "react-select";
import { Props as ReactSelectProps } from "react-select";

export interface ColourOption extends ReactSelectProps {
  size?: "lg" | "sm" | "md" | "xl";
  label: ReactNode;
  value?: any;
  onChange?: (selected: any) => void;
  className: string;
  error: any;
  isClearable?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

const SelectComponent = ({
  size,
  label,
  placeholder,
  isClearable = false,
  disabled = false,
  ...props
}: ColourOption) => {
  const { theme } = useTheme();

  const getBorderColor = (theme: string | undefined) => {
    if (theme === "dark") {
      return "white";
    } else {
      return "#3B82F6";
    }
  };
  const customStyles = {
    input: (provided: any) => ({
      ...provided,
      "input:focus": {
        boxShadow: "none",
      },
      color: "inherit",
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      minHeight:
        size === "xl"
          ? "54px"
          : size === "lg"
          ? "44px"
          : size === "md"
          ? "40px"
          : "24px",
      fontSize:
        size === "xl"
          ? "15px"
          : size === "lg"
          ? "13px"
          : size === "md"
          ? "11px"
          : "11px",
      borderColor: props.error
        ? "red"
        : state.isFocused
        ? getBorderColor(theme)
        : "",
      backgroundColor: "transparent",
      boxShadow: "none",
      borderRadius: "5px",
      borderWidth: "2px",
      "&:hover": {
        borderColor: props.error
          ? "red"
          : theme === "dark"
          ? "#aaa"
          : "#3B82F6",
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 999999,
      backgroundColor: theme === "dark" ? "#333333" : "white",
      // backgroundColor: "#333333",
    }),
    menuPortal: (provided: any) => ({
      ...provided,
      zIndex: 9999,
    }),
    singleValue: (base: any) => ({
      ...base,
      color: theme === "dark" ? "white" : "black",
    }),
    option: (styles: any, state: any) => ({
      ...styles,
      fontSize:
        size === "xl"
          ? "15px"
          : size === "lg"
          ? "13px"
          : size === "md"
          ? "11px"
          : "11px",
    }),
  };

  return (
    <div className="flex flex-col flex-1 gap-0.5">
      {label}
      <ReactSelect
        isDisabled={disabled}
        {...props}
        // menuPortalTarget={document.body}
        menuPosition="fixed"
        isClearable={isClearable}
        styles={customStyles}
        placeholder={placeholder}
      />
      <p className="text-red-600">{props.error}</p>
    </div>
  );
};

export default SelectComponent;
