<template>
	<div class="position-relative">
		<!--using require just for the mock up in this demo, bind directly to src in production-->
		<img v-bind:src="require('../assets/landscape6.jpeg')" alt="Background Image" class="position-absolute w-100">
		<div class="position-absolute w-100 image-overlay"></div>
		<div class="position-relative py-3 contents">
			<profile></profile>
			<portfolio></portfolio>
		</div>
	</div>
</template>

<script>
import Profile from "@/components/Profile";
import Portfolio from "@/components/Portfolio";

export default {
	name: "Home",
	
	components: {
		Profile,
		Portfolio,
	},
	
	data() {
		return {
		
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";

img {
	height: 100%;
	min-height: 100vh;
	opacity: .5;
	object-fit: cover;
}

.image-overlay {
	height: 100%;
	min-height: 100vh;
	backdrop-filter: blur(3rem);
}

.contents {
	margin: 0 15%;
	z-index: 9;
	
	@include media-breakpoint-down(sm) {
		margin: 0 5%;
	}
	
	@include media-breakpoint-down(lg) {
		margin: 0 10%;
	}
}
</style>