"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/hooks/use-debounce"; // I need to create this hook or just inline it

export function SearchInput() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get("q") || "";
    const [search, setSearch] = React.useState(initialSearch);
    const debouncedSearch = useDebounce(search, 500);

    React.useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (debouncedSearch) {
            params.set("q", debouncedSearch);
        } else {
            params.delete("q");
        }
        // Reset page when searching
        params.delete("page");

        router.push(`/blog?${params.toString()}`);
    }, [debouncedSearch, router, searchParams]);

    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search posts..."
                className="pl-9 w-full md:w-[300px]"
            />
        </div>
    );
}
