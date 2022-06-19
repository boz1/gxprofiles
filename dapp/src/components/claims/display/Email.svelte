<script lang="ts">
  import { Input, Label, GitHubIcon } from 'src/components';
  import type { EmailDraft, Claim } from 'src/helpers';
  import { ClaimLinkInput } from 'src/components/claims';

  export let claim: Claim;
  $: display = claim.display;
  $: draft = claim.draft as EmailDraft;
</script>

<div>
  <div class="flex justify-between items-center">
    <Label class="mt-4" fieldName="basic-email" value="Email Address" />

    {#if draft?.email}
      <p class="text-sm text-gray-350 mt-2">(signed-by tzprofiles.com)</p>
    {/if}
  </div>
</div>
