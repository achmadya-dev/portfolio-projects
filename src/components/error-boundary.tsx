import type { ErrorComponentProps } from "@tanstack/react-router";

import { Link, rootRouteId, useMatch, useRouter } from "@tanstack/react-router";
import { AlertTriangle, ChevronDown, Copy, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  });
  const [open, setOpen] = useState(false);

  const getErrorMessage = (errorParam: unknown): string => {
    if (!errorParam) {
      return "Unknown error";
    }

    if (typeof errorParam === "string") {
      return errorParam;
    }

    if (errorParam instanceof Error) {
      return errorParam.message;
    }

    if (
      typeof errorParam === "object" &&
      errorParam &&
      "message" in errorParam
    ) {
      return String((errorParam as { message: unknown }).message);
    }

    return String(errorParam);
  };

  const getErrorStack = (errorParam: unknown): string => {
    if (!errorParam) {
      return "";
    }

    if (errorParam instanceof Error) {
      return errorParam.stack || "";
    }

    if (typeof errorParam === "object" && errorParam && "stack" in errorParam) {
      return String((errorParam as { stack: unknown }).stack);
    }

    return "";
  };

  const errorMessage = getErrorMessage(error);
  const errorStack = getErrorStack(error);
  const unknownError = "Unknown error";

  const copyDetails = async () => {
    const body = `${errorMessage}\n\n${errorStack}`.trim();
    try {
      await navigator.clipboard.writeText(body);
      toast.success("Error details copied");
    } catch {
      toast.error("Failed to copy error details");
    }
  };

  return (
    <div className="flex min-w-0 flex-1 items-center justify-center p-4">
      <Card className="mx-auto min-h-full w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-destructive" />
              <CardTitle>Something went wrong</CardTitle>
            </div>
            <Button
              aria-label="Try again"
              onClick={() => router.invalidate()}
              size="sm"
              type="button"
              variant="outline"
            >
              <RefreshCcw />
              Retry
            </Button>
          </div>
          <CardDescription className="text-muted-foreground">
            An unexpected error occurred. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid min-h-0 gap-4">
          <Alert variant="destructive">
            <AlertTitle>{errorMessage}</AlertTitle>
            {(errorStack || errorMessage !== unknownError) && (
              <AlertDescription>
                <Collapsible onOpenChange={setOpen} open={open}>
                  <div className="flex items-center gap-2">
                    {errorStack && (
                      <CollapsibleTrigger>
                        <Button
                          aria-controls="error-details"
                          aria-expanded={open}
                          size="sm"
                          type="button"
                          variant="ghost"
                        >
                          <ChevronDown
                            className={
                              open
                                ? "rotate-180 transition-transform"
                                : "transition-transform"
                            }
                          />
                          Error details
                        </Button>
                      </CollapsibleTrigger>
                    )}
                    <Button
                      aria-label="Copy"
                      onClick={copyDetails}
                      size="sm"
                      type="button"
                      variant="ghost"
                    >
                      <Copy />
                      Copy
                    </Button>
                  </div>
                  {errorStack && (
                    <CollapsibleContent className="mt-2">
                      <div className="rounded-md border bg-muted/20 p-3">
                        <ScrollArea className="w-full">
                          <pre
                            className="whitespace-pre-wrap text-xs leading-5"
                            id="error-details"
                          >
                            {errorStack}
                          </pre>
                        </ScrollArea>
                      </div>
                    </CollapsibleContent>
                  )}
                </Collapsible>
              </AlertDescription>
            )}
          </Alert>
        </CardContent>
        <CardFooter className="flex flex-wrap justify-end gap-2">
          {isRoot ? (
            <Button type="button" variant="outline">
              <Link to="/">Home</Link>
            </Button>
          ) : (
            <Button
              onClick={(e) => {
                e.preventDefault();
                window.history.back();
              }}
              type="button"
              variant="outline"
            >
              Go back
            </Button>
          )}
          <Button onClick={() => router.invalidate()} type="button">
            <RefreshCcw />
            Try again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
