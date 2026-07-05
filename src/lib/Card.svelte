<script lang="ts">
    let { title, children } = $props();
</script>

<div class="card">
    <span class="card-title">{title}</span>
    <div class="content">
        {@render children()}
    </div>
</div>

<style>
    .card {
        margin: 1rem;
        padding: 1rem;
        background-color: rgba(0, 0, 0, 0.2);
        transition: background-color 0.3s ease;
        overflow: hidden;
    }

    .card:hover {
        background-color: rgba(0, 0, 0, 0.5);
    }

    .card-title {
        font-weight: 200;
        font-size: 0.8rem;
        text-transform: uppercase;
    }
</style>
