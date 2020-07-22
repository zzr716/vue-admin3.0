<template>
<svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="name"></use>
</svg>
</template>

<script>
import { ref, reactive, isRef, toRefs, computed, onMounted } from "@vue/composition-api";
export default {
    name: "svgIcon",
    props: {
        iconClass: {
            type: String,
            default: ''
        },
        className: {
            type: String,
            default: ''
        }
    },
    setup (props) {
        console.log(props.iconClass)
        const msg = ref('nihao')
        const name = computed(() => `#icon-${props.iconClass}`)
        const svgClass = computed(() => {
            if (props.className) {
                return `svg-icon font12 ${props.className}`
            } else {
                return `svg-icon`
            }
        })
        return {
            msg,
            name,
            svgClass
        }
    }
}
</script>

<style lang="scss" scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    color: #ff0000;
    fill: currentColor;
    &.font12 {
        font-size: 12px;
    }
}
</style>