<script lang="ts">
    import { onMount } from "svelte";

    let query = $state("");
    let engine = $state("brave");

    function search() {
        let url = "";
        switch (engine) {
            case "google":
                url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                break;
            case "duckduckgo":
                url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
                break;
            case "brave":
                url = `https://search.brave.com/search?q=${encodeURIComponent(query)}`;
                break;
        }
        window.open(url, "_blank");
    }

    onMount(() => {
        searchInput.focus();

        searchInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                search();
            }
        });
    });

    let searchInput: HTMLInputElement;
</script>

<div class="search-group">
    <input
        id="search"
        type="text"
        placeholder="Search..."
        bind:value={query}
        bind:this={searchInput}
    />
    <select name="engine" id="engine" bind:value={engine}>
        <option value="google">Google</option>
        <option value="duckduckgo">DuckDuckGo</option>
        <option value="brave">Brave</option>
    </select>
    <button onclick={search}>Search</button>
</div>

<style>
    .search-group {
        display: flex;
        justify-content: center;
        align-items: center;
        border: #fff 1px solid;
    }

    input,
    select,
    button {
        appearance: none;
        border: #fff 1px solid;
        outline: none;
        background-color: rgba(0, 0, 0, 0.2);
        font-family: "Space Mono", monospace;
        color: #fff;
        padding: 0.5rem;
        font-size: 1rem;
        transition: all 0.3s ease;
    }

    input {
        width: 100%;
    }

    input:hover,
    input:focus,
    select:hover,
    select:focus {
        background-color: rgba(0, 0, 0, 0.5);
    }

    button {
        background-color: #fff;
        color: #000;
    }

    button:hover {
        background-color: rgba(255, 255, 255, 0.8);
    }

    option {
        appearance: none;
        background-color: #000;
        color: #fff;
    }
</style>
