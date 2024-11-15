import React from "react";
import clsx from "clsx";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className, children }) => {
  return (
    <div className={clsx("bg-white shadow-md rounded-lg overflow-hidden", className)}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ className, children }) => {
  return (
    <div className={clsx("p-6 border-b border-gray-200", className)}>
      {children}
    </div>
  );
};

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({ className, children }) => {
  return (
    <h2 className={clsx("text-2xl font-semibold", className)}>{children}</h2>
  );
};

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ className, children }) => {
  return (
    <div className={clsx("p-6", className)}>
      {children}
    </div>
  );
};

export default { Card, CardHeader, CardTitle, CardContent };
