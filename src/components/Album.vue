<template>
	<div>
		<div class="position-relative embed-responsive embed-responsive-16by9 bg-white rounded-top">
			<!--using require just for the mock up in this demo, bind directly to src in production-->
			<img v-bind:src="require(`../assets/${cover}`)" alt="Album Cover" class="embed-responsive-item">
			<div class="position-absolute w-100 h-50 cover-overlay"></div>
			<h4 class="position-absolute px-3 py-2 font-weight-bold text-white">{{ title }}</h4>
		</div>
		<div class="px-3 py-2 bg-white rounded-bottom">
			<p>{{ description }}</p>
			<div class="d-flex justify-content-between align-items-center">
				<font-awesome-icon v-if="featured" v-bind:icon="['fas', 'heart']" class="h4 text-heart"></font-awesome-icon>
				<span class="ml-auto h6 font-weight-normal text-grey">{{ formattedCreatedAt }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import { format } from "date-fns";

export default {
	name: "Album",
	
	props: {
		albumId: {
			type: String,
			required: true,
		},
		
		title: {
			type: String,
			required: true,
		},
		
		description: {
			type: String,
		},
		
		cover: {
			type: String,
		},
		
		createdAt: {
			type: String,
			required: true,
		},
		
		featured: {
			type: Boolean,
			default: false,
		},
	},
	
	computed: {
		formattedCreatedAt() {
			return format(new Date(this.createdAt), "yyyy-MM-dd");
		}
	}
}
</script>

<style lang="scss" scoped>
.embed-responsive-item {
	object-fit: cover;
}

.cover-overlay {
	bottom: 0;
	background: linear-gradient(to top, black 25%, transparent);
	opacity: .25;
}

h4 {
	bottom: 0;
	z-index: 9;
}

p {
	line-height: 1.2rem;
	max-height: 60px;
	overflow-y: hidden;
}
</style>