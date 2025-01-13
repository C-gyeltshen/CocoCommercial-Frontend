import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => {
  const styles = clsx("bg-white shadow rounded-lg p-4", className);

  return (
    <div className={styles} {...props}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => {
  const styles = clsx("p-4", className);

  return (
    <div className={styles} {...props}>
      {children}
    </div>
  );
};
