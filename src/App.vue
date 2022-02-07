<template>
	<div id="app">
		<router-view></router-view>
    </div>
</template>

<style lang="scss">
$theme-colors: (
		"grey": #999999,
		"magenta": #e73ea4,
		"heart": #f55c4a,
		"transparent": rgba(255,255,255,0),
);

@import "~bootstrap/scss/bootstrap";
@import "~bootstrap-vue/src/index";

html,
body {
	margin: 0;
	background-color: #FFFFFF;
	font-family:
			-apple-system,
			BlinkMacSystemFont,
			Segoe UI,
			Roboto,
			Helvetica Neue,
			Arial,
			"Microsoft JhengHei",
			sans-serif,
			Apple Color Emoji,
			Segoe UI Emoji,
			Segoe UI Symbol,
			Noto Color Emoji;
}
</style>
