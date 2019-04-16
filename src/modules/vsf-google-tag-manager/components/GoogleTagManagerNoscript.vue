<template>
    <noscript v-if="id && id.length > 4">
        <iframe src="https://www.googletagmanager.com/ns.html?id=' + this.id + '" height="0" width="0" style="display:none;visibility:hidden"/>
    </noscript>
</template>

<script>
    export default {
        computed: {
            id () {
                return this.$store.state.config.googleTagManager.id
            },
            htmlContent () {
                return '</iframe>'
            }
        }
    }
</script>