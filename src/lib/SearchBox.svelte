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

    input {
        width: 100%;
    }
</style>
