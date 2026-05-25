<script>
  import { siteTextLicense } from "$lib/config";
  let { license } = $props();
</script>

<style>
  footer {
    text-align: right;
    width: 75%;
    margin-left: auto;
  }
</style>

{#if !license.original}
<hr>
<footer>This page's text is licensed under <a href={license.licenseLink}>{license.licenseName}</a>. The original author is {license.author}, and the original work can be found <a href={license.creditLink}>here</a>. The content has {#if !license.modified}not {/if} been modified from the original work.<br>See <a href="/licenses">Licenses</a> for more information.</footer>
{/if}