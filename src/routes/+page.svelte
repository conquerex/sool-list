<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;

	console.log('>>>> page start ');

	$: ({ tutorials } = data);

	function defaultButtonState(tutorial: any) {
		if (tutorial.state == 0) {
			return true;
		} else {
			return false;
		}
	}

	function processButtonState(tutorial: any) {
		if (tutorial.state == 1) {
			return true;
		} else {
			return false;
		}
	}

	function successButtonState(tutorial: any) {
		if (tutorial.state == 2) {
			return true;
		} else {
			return false;
		}
	}

	async function editState(index: number) {
		let tutorial = tutorials[index];
		tutorial.state = tutorial.state > 1 ? 0 : tutorial.state + 1;
		tutorials[index] = tutorial;
	}
</script>

<svelte:head>
	<title>술트럭파티 술 리스트</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div class="wrapper">
		{#each tutorials as tutorial, index}
			<form
				method="POST"
				action="?/editUser"
				use:enhance={() => {
					return async () => {
						editState(index);
					};
				}}
			>
				<input hidden name="id" type="text" value={tutorial._id} />
				<input hidden name="title" type="text" value={tutorial.title} />
				<input hidden name="state" type="number" value={tutorial.state} />
				<button
					class="button +
					 {tutorial.state == 0 ? 'button--default' : ''} +
					  {tutorial.state == 1 ? 'button--process' : ''} +
					   {tutorial.state == 2 ? 'button--success' : ''} "
				>
					<div class="button__icon-wrapper">
						<div class="button__icon" />
					</div>
					<div class="button__text-wrapper" style="width: {tutorial.length}em">
						<div class="button__text button__text--default">{tutorial.title}</div>
						<div class="button__text button__text--process">{tutorial.title}</div>
						<div class="button__text button__text--success">{tutorial.title}</div>
					</div>
				</button>
			</form>
		{/each}
	</div>

	<p />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
