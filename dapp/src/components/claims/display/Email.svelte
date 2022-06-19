<script lang="ts">
  import { Input, Label } from 'src/components';
  import { ClaimLinkInput } from 'src/components/claims';
  import type { EmailDraft, Claim } from 'src/helpers';

  export let emailClaim: Claim;
  $: display = emailClaim.display;
  $: draft = emailClaim.draft as EmailDraft;
</script>

<div>
  <div class="flex justify-between items-center">
    <Label class="mt-4" fieldName="email" value="Eamil" />
  </div>
  {#if draft.email}
    <Input fluid name="email" class="mb-3" value={draft.email} disabled />
  {:else}
    <ClaimLinkInput {display} />
  {/if}

  <div class="flex items-center justify-between">
    <div
      class="flex flex-col items-center justify-center w-32 h-32 text-center border rounded-lg border-gray-200 text-gray-350"
      class:opacity-60={true}
    >
      <p class="m-2 italic break-words select-none">
        {'Available in '}
        <a href="/basic-profile" class="underline">
          Employee profile Information
        </a>
      </p>
    </div>
  </div>
</div>
