import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
    className?: string;
    queryParams?: Record<string, string>;
}

export function Pagination({
    currentPage,
    totalPages,
    baseUrl,
    className,
    queryParams = {},
}: PaginationProps) {
    const createPageUrl = (page: number) => {
        const params = new URLSearchParams(queryParams);
        params.set("page", page.toString());
        return `${baseUrl}?${params.toString()}`;
    };

    if (totalPages <= 1) return null;

    return (
        <div className={cn("flex items-center justify-center space-x-2", className)}>
            <Button
                variant="outline"
                size="icon"
                disabled={currentPage <= 1}
                asChild={currentPage > 1}
            >
                {currentPage > 1 ? (
                    <Link href={createPageUrl(currentPage - 1)}>
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                ) : (
                    <span className="opacity-50 cursor-not-allowed">
                        <ChevronLeft className="h-4 w-4" />
                    </span>
                )}
            </Button>

            <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
            </span>

            <Button
                variant="outline"
                size="icon"
                disabled={currentPage >= totalPages}
                asChild={currentPage < totalPages}
            >
                {currentPage < totalPages ? (
                    <Link href={createPageUrl(currentPage + 1)}>
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                ) : (
                    <span className="opacity-50 cursor-not-allowed">
                        <ChevronRight className="h-4 w-4" />
                    </span>
                )}
            </Button>
        </div>
    );
}
