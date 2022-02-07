<template>
	<div>
		<div class="container-fluid pt-2 px-0">
			<b-skeleton-wrapper v-bind:loading="loading">
				<template v-slot:loading>
					<div class="row no-gutters mx-n2 row-cols-1 row-cols-md-2 row-cols-lg-3">
						<div v-for="n in 6" class="col p-2">
							<div class="position-relative embed-responsive embed-responsive-16by9">
								<b-skeleton type="input" class="embed-responsive-item border-0"></b-skeleton>
							</div>
						</div>
					</div>
				</template>
				<template>
					<div v-if="isError" class="text-center mt-3">
						<h4 class="text-danger">Whoops! Something went wrong, please try again later</h4>
						<button class="btn btn-dark mt-3 font-weight-bold" v-on:click="getAlbums">RETRY</button>
					</div>
					<div v-else class="row no-gutters mx-n2 row-cols-1 row-cols-md-2 row-cols-lg-3">
						<album v-for="{ _id, title, description, cover, createdAt, featured } in albums"
						       v-bind:key="_id" class="col p-2"
						       v-bind:album-id="_id" v-bind:title="title"
						       v-bind:cover="cover"
						       v-bind:description="description"
						       v-bind:created-at="createdAt"
						       v-bind:featured="featured"
						       v-bind:loading="loading"></album>
					</div>
				</template>
			</b-skeleton-wrapper>
		</div>
	</div>
</template>

<script>
import { fetchAlbum } from "@/api/album/get";
import Album from "@/components/Album";
import { BSkeleton, BSkeletonWrapper, BSkeletonImg } from "bootstrap-vue";

export default {
    name: "Portfolio",
	
	components: {
		Album,
		BSkeleton,
		BSkeletonWrapper,
		BSkeletonImg
	},
	
	mounted() {
		this.getAlbums();
	},
	
	data() {
		return {
			albums: [],
			loading: true,
			isError: false,
		}
	},
	
	methods: {
		async getAlbums() {
			this.loading = true;
			this.isError = false;
			
			try {
				this.albums = await fetchAlbum("");
			} catch (e) {
				this.isError = true;
			}
			
			this.loading = false;
		}
	}
}
</script>

<style lang="scss" scoped>

</style>