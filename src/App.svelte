<script lang="ts">
    import { onMount } from "svelte";
    import { getImageOfTheDay, type ImageOfTheDay } from "./lib/nasa";
    import Card from "./lib/Card.svelte";
    import SearchBox from "./lib/SearchBox.svelte";

    onMount(async () => {
        setInterval(updateTime, 1000);
        imageOfTheDay = await getImageOfTheDay();
    });

    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        time = `${hours}:${minutes}:${seconds}`;
    }

    let imageOfTheDay: ImageOfTheDay | null = $state(null);
    let time = $state("00:00:00");
    let query = $state("");
</script>

<svelte:head>
    <title>New Tab</title>
</svelte:head>

<div id="background">
    {#if imageOfTheDay}
        {#if imageOfTheDay.media_type === "video"}
            <video src={imageOfTheDay.url} autoplay muted></video>
        {:else}
            <img src={imageOfTheDay.url} alt={imageOfTheDay.title} />
        {/if}
    {:else}
        <div class="loading">
            <p>Loading...</p>
        </div>
    {/if}

    <div class="columns">
        <div class="left"></div>
        <div class="center">
            <h1>{time}</h1>
            <SearchBox></SearchBox>
        </div>
        <div class="right">
            <Card title="About this image">
                <h2>{imageOfTheDay?.title}</h2>
                <p class="explanation">{imageOfTheDay?.explanation}</p>
            </Card>
        </div>
    </div>
</div>

<style>
    #background img,
    #background video,
    .loading {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
        filter: brightness(0.5);
        overflow: hidden;
    }

    .loading {
        color: #fff;
        background-color: #000;
    }

    .columns {
        display: grid;
        height: 100vh;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 1rem;
    }

    .columns > div {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .explanation {
        font-size: 0.8rem;
        line-height: 1.2rem;
        overflow-y: auto;
    }
</style>
