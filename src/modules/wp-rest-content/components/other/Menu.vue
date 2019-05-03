<template>
    <ul v-bind="$attrs" v-on="$listeners">
        <li v-for="item in menuItems">{{ item.title }}</li>
    </ul>
</template>

<script>
    // Simplest wrapper for menu

    export default {
        props: {
            menuSlug: {
                type: String,
                required: true
            }
        },
        computed: {
            menu () {
                return this.$store.state.wp_rest_content.menus
            },
            menuItems () {
                return this.menu[this.menuSlug].items
            }
        }
    }
</script>