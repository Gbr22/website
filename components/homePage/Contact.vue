<script setup lang="ts">
import { localize } from '~~/localization';
import ContactItem from './ContactItem.vue';
</script>

<template>
    <div class="contact">
        <h2 class="header" id="contact">
            {{ localize({
                en:"Find me on any of these platforms",
                hu:"Ezeken a platformokon lehet engem megtalálni"
            }) }}
        </h2>
        <div class="details">
            <ContactItem
                href="mailto:gabor.krisko@gmail.com"
                text="gabor.krisko@gmail.com"
                icon="mail"
            ></ContactItem>
            <ContactItem
                href="https://www.linkedin.com/in/gaborkrisko/"
                :text="localize({hu:'Kriskó Gábor',en:'Gábor Kriskó'})"
                icon="linkedin"
            ></ContactItem>
            <ContactItem
                href="https://www.instagram.com/gaborkrisko/"
                text="@gaborkrisko"
                icon="instagram"
            ></ContactItem>
            <ContactItem
                href="https://discordapp.com/users/180660463699230720"
                text="kess#0157"
                icon="discord"
            ></ContactItem>
            <ContactItem
                href="https://github.com/Gbr22"
                text="Gbr22"
                icon="github"
            ></ContactItem>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '~~/styles/homepage.scss';

.contact {
    padding-bottom: calc(var(--section-spacing) * 3);

    .header {
        @include homepage-header;

        min-width: min(100%, 300px);
        width: 80vw;
        max-width: 800px;
        text-align: center;
        margin: 0 auto;
        padding: 0 var(--page-padding);
        padding-top: calc(var(--section-spacing) * 2.5);
        padding-bottom: calc(var(--section-spacing) * 2);
    }

    .details {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: 0 auto;
        width: fit-content;
    }
}
@media screen and (max-width: 650px) {
    .contact {
        .header {
            padding-top: calc(var(--section-spacing) * 1 + 20px);
            padding-bottom: calc(var(--section-spacing) * 2 + 20px);
        }
    }
}
</style>