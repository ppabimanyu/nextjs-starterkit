import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  ...props
}: React.PropsWithChildren & React.ComponentProps<"div">) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {children}
    </div>
  );
}

export function SectionHeader({
  children,
  className,
  ...props
}: React.PropsWithChildren & React.ComponentProps<"div">) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {children}
    </div>
  );
}

export function SectionTitle({
  children,
  className,
  ...props
}: React.PropsWithChildren & React.ComponentProps<"div">) {
  return (
    <div className={cn("text-md font-semibold", className)} {...props}>
      {children}
    </div>
  );
}

export function SectionDescription({
  children,
  className,
  ...props
}: React.PropsWithChildren & React.ComponentProps<"div">) {
  return (
    <div className={cn("text-xs text-muted-foreground", className)} {...props}>
      {children}
    </div>
  );
}

export function SectionContent({
  children,
  className,
  ...props
}: React.PropsWithChildren & React.ComponentProps<"div">) {
  return (
    <div
      className={cn("space-y-4 p-4 border rounded-lg bg-card", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function SectionItem({
  children,
  className,
  ...props
}: React.PropsWithChildren & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-center gap-2 justify-between",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SectionItemHeader({
  children,
  className,
  ...props
}: React.PropsWithChildren & React.ComponentProps<"div">) {
  return (
    <div className={cn("space-y-1 flex-3/5", className)} {...props}>
      {children}
    </div>
  );
}

export function SectionItemTitle({
  children,
  className,
  ...props
}: React.PropsWithChildren & React.ComponentProps<"div">) {
  return (
    <div className={cn("text-sm font-medium", className)} {...props}>
      {children}
    </div>
  );
}

export function SectionItemDescription({
  children,
  className,
  ...props
}: React.PropsWithChildren & React.ComponentProps<"div">) {
  return (
    <div className={cn("text-xs text-muted-foreground", className)} {...props}>
      {children}
    </div>
  );
}

export function SectionItemContent({
  children,
  className,
  ...props
}: React.PropsWithChildren & React.ComponentProps<"div">) {
  return (
    <div
      className={cn("space-y-2 flex-2/5 flex flex-col md:items-end", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function SectionFooter({
  children,
  className,
  ...props
}: React.PropsWithChildren & React.ComponentProps<"div">) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {children}
    </div>
  );
}
