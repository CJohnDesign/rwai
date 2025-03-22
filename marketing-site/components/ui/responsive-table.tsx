import React from 'react';
import { cn } from "../../lib/utils";

interface ResponsiveTableProps extends React.HTMLAttributes<HTMLDivElement> {
  headers: string[];
  children: React.ReactNode;
}

interface TableElement extends React.ReactElement {
  props: {
    children?: React.ReactNode;
  };
}

interface ResponsiveTableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  colSpan?: number;
}

export function ResponsiveTable({ headers, children, className, ...props }: ResponsiveTableProps) {
  return (
    <div className={cn("w-full overflow-auto", className)} {...props}>
      {/* For larger screens */}
      <table className="hidden md:table min-w-full divide-y divide-border">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        {children}
      </table>

      {/* For mobile screens */}
      <div className="space-y-4 md:hidden">
        {React.Children.map(children, (tbody) => {
          if (!React.isValidElement(tbody)) return null;
          const tbodyElement = tbody as TableElement;
          
          return React.Children.map(tbodyElement.props.children, (tr) => {
            if (!React.isValidElement(tr)) return null;
            const trElement = tr as TableElement;

            return (
              <div className="bg-card rounded-lg border border-border p-4 space-y-2">
                {React.Children.map(trElement.props.children, (td, index) => {
                  if (!React.isValidElement(td)) return null;
                  const tdElement = td as TableElement;

                  return (
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        {headers[index]}
                      </span>
                      <div className="text-sm text-right flex-1">
                        {tdElement.props.children}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}

export function ResponsiveTableBody({ children, className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={cn("divide-y divide-border bg-background", className)} {...props}>
      {children}
    </tbody>
  );
}

export function ResponsiveTableRow({ children, className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={cn("", className)} {...props}>
      {children}
    </tr>
  );
}

export function ResponsiveTableCell({ children, className, colSpan, ...props }: ResponsiveTableCellProps) {
  return (
    <td className={cn("px-4 py-3 text-sm", className)} colSpan={colSpan} {...props}>
      {children}
    </td>
  );
} 