<template>
	<div class="position-relative d-flex px-3 px-md-4 py-3 bg-white rounded">
		<div class="flex-grow-1">
			<div class="position-relative w-100 embed-responsive embed-responsive-1by1 avatar-wrapper">
				<b-skeleton v-if="loading" type="avatar" class="embed-responsive-item avatar"></b-skeleton>
				<!--using require just for the mock up in this demo, bind directly to src in production-->
				<img v-else v-bind:src="require(`../assets/${avatar}`)" alt="Avatar"
				     class="position-absolute embed-responsive-item w-100 rounded-circle avatar">
			</div>
		</div>
		<div class="position-relative flex-grow-1 pl-3 pb-1 py-md-2 information">
			<b-skeleton v-if="loading" type="text" height="2rem" class="border-0 skeleton-name"></b-skeleton>
			<h4 v-else class="mb-1 mb-md-2 font-weight-bold">{{ name }}</h4>
			<div class="d-md-flex">
				<div class="pr-md-3 flex-grow-1">
					<h6 class="mb-1 font-weight-bold small text-grey">Biography</h6>
					<b-skeleton v-if="loading" type="input" height="5rem" class="w-100 border-0 mt-2 mb-3"></b-skeleton>
					<p v-else id="Biography" class="small text-grey collapse-3-rows"
					   v-bind:class="[expand ? 'expand' : '', showExpandBtn ? 'mb-0' : 'mb-2']">{{ biography }}</p>
					<button type="button" class="btn btn-link p-0 mb-1 text-decoration-none shadow-none"
					        v-if="showExpandBtn" v-on:click="expandBiography()">
						<span class="small">{{ expandBtnTitle }}</span>
					</button>
				</div>
				<div class="contact">
					<div class="d-flex flex-md-column mb-1 mb-md-2">
						<h6 class="mb-1 font-weight-bold small text-grey">Phone</h6>
						<b-skeleton v-if="loading" type="text" height="1.5rem"
						            class="mt-n1 mt-md-1 border-0 skeleton-contact"></b-skeleton>
						<a v-else v-bind:href="`tel:+1${phone}`" class="d-inline-block small text-magenta text-break">{{ phone }}</a>
					</div>
					<div class="d-flex flex-md-column">
						<h6 class="mb-1 font-weight-bold small text-grey">Email</h6>
						<b-skeleton v-if="loading" type="text" height="1.5rem"
						            class="mt-n1 mt-md-1 border-0 skeleton-contact"></b-skeleton>
						<a v-else v-bind:href="`mailto:${email}`" class="d-inline-block small text-magenta text-break">{{ email }}</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { fetchProfile } from "@/api/profile/get";
import { BSkeleton } from "bootstrap-vue";

export default {
	name: "Profile",
	
	components: {
		BSkeleton,
	},
	
	mounted() {
		this.getProfile();
	},
	
	data() {
		return {
			name: "",
			phone: "",
			email: "",
			biography: "",
			avatar: "",
			loading: true,
			expand: true,
			showExpandBtn: false,
		}
	},
	
	computed: {
		expandBtnTitle() {
			return this.expand ? "SHOW LESS" : "SHOW MORE";
		},
	},
	
	methods: {
		async getProfile() {
			try {
				const profile = await fetchProfile("");
				const { name, phone, email, biography, avatar } = profile;
				this.name = name;
				this.phone = phone;
				this.email = email;
				this.biography = biography;
				this.avatar = avatar;
				this.loading = false;
			} catch (e) {
				// keep the loading state
			}
			
			// use nextTick to extract the biography paragraph height after DOM being updated due to newly fetched data
			this.$nextTick(() => {
				if (this.biography) {
					const expandedHeight = this.$el.querySelector("#Biography").offsetHeight;
					
					// 3 rows height = 53 px
					if (expandedHeight > 53) {
						this.expand = false;
						this.showExpandBtn = true;
					}
				}
			});
		},
		
		expandBiography() {
			if (this.expand) {
				const y = this.$el.querySelector("#Biography").getBoundingClientRect().y;
				
				if (y < 0) {
					this.expand = false;
					document.scrollingElement.scrollTo(0, 0);
				} else {
					this.expand = false;
				}
			} else {
				this.expand = true;
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";

.avatar-wrapper {
	width: 15%;
	min-width: 5rem;
	
	.avatar {
		top: 0;
	}
}

.information {
	width: 85%;
	
	h6 {
		min-width: 3rem;
	}
	
	p {
		line-height: 1.1rem;
	}
	
	button {
		font-size: 90%;
	}
	
	.skeleton-name {
		width: 30%;
		
		@include media-breakpoint-down(md) {
			width: 35%;
		}
		
		@include media-breakpoint-down(sm) {
			width: 50%;
		}
	}
	
	.collapse-3-rows {
		max-height: 53px;
		overflow-y: hidden;
		white-space: pre-wrap;

		&.expand {
			height: auto;
			max-height: unset;
		}
	}
	
	.contact {
		min-width: 25%;

		a {
			line-height: 1rem;
			cursor: pointer;
		}

		.skeleton-contact {
			width: 100%;

			@include media-breakpoint-down(sm) {
				width: 40%;
			}
		}
	}
}
</style>