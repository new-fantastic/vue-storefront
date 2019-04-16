<template>
    <noscript v-if="code && code.length > 4">
        <iframe :src="'https://www.googletagmanager.com/ns.html?id=' + code"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
    </noscript>
</template>

<script>
    export default {
        computed: {
            code () {
                return this.$store.state.config.googleTagManager.code
            }
        }
    }
</script>