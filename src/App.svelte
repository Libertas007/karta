<script lang="ts">
    import { onMount } from "svelte";
    import { getImageOfTheDay, type ImageOfTheDay } from "./lib/nasa";
    import Card from "./lib/Card.svelte";
    import SearchBox from "./lib/SearchBox.svelte";
    import {
        getWeather,
        getWeatherIcon,
        type WeatherData,
    } from "./lib/weather";

    import "@hackernoon/pixel-icon-library/fonts/iconfont.css";

    onMount(async () => {
        setInterval(updateTime, 1000);
        imageOfTheDay = await getImageOfTheDay();
        date = imageOfTheDay.date;
        await getWeatherData();
    });

    async function getWeatherData() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                weather = await getWeather(
                    position.coords.latitude,
                    position.coords.longitude,
                );
            });
        }
    }

    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        time = `${hours}:${minutes}:${seconds}`;
    }

    let imageOfTheDay: ImageOfTheDay | null = $state(null);
    let weather: WeatherData | null = $state(null);
    let time = $state("00:00:00");
    let query = $state("");
    let update = $state(false);

    let date = $state("");

    async function goToDate() {
        let datetime = new Date(date);

        if (datetime > new Date()) {
            alert("Date cannot be in the future.");
            return;
        }

        if (date !== imageOfTheDay?.date) {
            imageOfTheDay = await getImageOfTheDay(date);
            update = !update;
        }
    }
</script>

<svelte:head>
    <title>New Tab</title>
</svelte:head>

<div id="background">
    {#if imageOfTheDay}
        {#if imageOfTheDay.media_type === "video"}
            <video src={imageOfTheDay.url} autoplay muted loop></video>
        {:else}
            <img src={imageOfTheDay.url} alt={imageOfTheDay.title} />
        {/if}
    {:else}
        <div class="loading">
            <p>Loading...</p>
        </div>
    {/if}

    <div class="columns">
        <div class="left">
            {#if weather}
                <Card title="Current Weather in {weather.name}">
                    <div class="weather">
                        <div class="icon">
                            <i
                                class="hn hn-{getWeatherIcon(
                                    weather.weather[0].id,
                                    weather.sys.sunrise,
                                    weather.sys.sunset,
                                )}"
                            ></i>
                        </div>
                        <div>
                            <h2>{weather.main.temp} °C</h2>
                            <p>Feels like {weather.main.feels_like} °C</p>
                            <p>{weather.weather[0].description}</p>
                        </div>
                    </div>
                </Card>
            {/if}
        </div>
        <div class="center">
            <h1>{time}</h1>
            <SearchBox></SearchBox>
        </div>
        <div class="right">
            {#key update}
                <Card title="About this image">
                    <h2>{imageOfTheDay?.title}</h2>
                    <p class="explanation">{imageOfTheDay?.explanation}</p>
                </Card>

                <Card title="Time machine">
                    <h2>Select image from another day</h2>

                    <input
                        type="date"
                        name="date"
                        id="date"
                        bind:value={date}
                    />
                    <button onclick={goToDate}>Go!</button>
                </Card>
            {/key}
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
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
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

    .weather {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .weather .icon {
        font-size: 3rem;
    }
</style>
