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

    const lastPushedUrlRef = React.useRef("");
    // Use a ref for searchParams to ensure the effect can always access 
    // the current parameters without being triggered by them
    const searchParamsRef = React.useRef(searchParams);
    
    React.useEffect(() => {
        searchParamsRef.current = searchParams;
    }, [searchParams]);

    React.useEffect(() => {
        const currentParams = searchParamsRef.current;
        const currentSearch = currentParams.get("q") || "";
        
        // Only trigger navigation if the debounced search actually differs from current URL params
        if (debouncedSearch === currentSearch) return;

        const params = new URLSearchParams(currentParams.toString());
        if (debouncedSearch) {
            params.set("q", debouncedSearch);
        } else {
            params.delete("q");
        }
        params.delete("page");

        const newUrl = `/blog?${params.toString()}`;
        
        // Prevent infinite loop by checking if we just pushed this URL
        if (newUrl === lastPushedUrlRef.current) return;
        
        lastPushedUrlRef.current = newUrl;
        router.push(newUrl);
    }, [debouncedSearch, router]);

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
