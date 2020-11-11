<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default{
	name:"app",
	components:{

	},
	// created() {
	//   if (this.$workbox) {
	//     this.$workbox.addEventListener("waiting", () => {
	//       this.showUpgradeUI = true;
	//     });
	//   }
	// },
	// methods: {
	//   async accept() {
	//     this.showUpgradeUI = false
	//     await this.$workbox.messageSW({ type: "SKIP_WAITING" });
	//   }
	// }
}
</script>

<style lang="scss">
	@import "@/components/Button.scss";
	@import "@/components/ButtonWithLoading.scss";
	@import "@/components/Skeleton.scss";
	@import "@/components/Modal.scss";

	*{
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		font-size: 10px;
		font-family: 'Baloo Thambi 2', cursive, Arial, sans-serif;
	}
	li{
		list-style: none;
	}
	a{
		text-decoration: none;
	}
	.text-medium {
		font-size: 1.7em;
		line-height: 1em;
		cursor: default;
	}

	.bold {
		font-weight: bold;
	}
	.text-15{
		font-size: 1.5em;
		line-height: 1em;
		cursor: default;
	}
	.sub-text {
		font-size: inherit;
		line-height: inherit;
	}
</style>
