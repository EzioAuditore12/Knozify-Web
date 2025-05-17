import { Dispatch, ReactElement, SetStateAction } from "react";
import { Link } from "@tanstack/react-router";

type NavItemProps = {
    key?: number,
    Icon: ReactElement,
    text: string,
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    to?: string, // Add optional route path
};

export const NavItems = ({
    Icon,
    text,
    isOpen,
    to
}: NavItemProps) => {
    const content = (
      <>
        <span 
          data-tooltip-id={!isOpen ? 'sidebar-tooltip' : undefined}
          data-tooltip-content={!isOpen ? text : undefined}
          className="text-xl">
          {Icon}
        </span>
        {isOpen && (
          <div>
              {text}
          </div>
        )}
      </>
    );

    return (
        <div className="flex items-center gap-4 cursor-pointer w-full hover:text-green-500">
          {to ? (
            <Link to={to} className="w-full flex items-center gap-4">
              {content}
            </Link>
          ) : (
            content
          )}
        </div>
    );
};