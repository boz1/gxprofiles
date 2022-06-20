<script lang="ts">
  import { Input, Label } from 'src/components';
  import { ClaimLinkInput } from 'src/components/claims';
  import type { BasicDraft, Claim } from 'src/helpers';

  export let basicClaim: Claim;
  $: display = basicClaim.display;
  $: draft = basicClaim.draft as BasicDraft;
</script>

<div>
  <div class="flex justify-between items-center">
    <Label class="mt-4" fieldName="basic-name" value="Name" />
    {#if draft.name}
      <p class="text-sm text-gray-350 mt-2">(self-attested)</p>
    {/if}
  </div>
  {#if draft.name}
    <Input fluid name="basic-name" class="mb-3" value={draft.name} disabled />
  {:else}
    <ClaimLinkInput {display} />
  {/if}

  <div class="flex justify-between items-center">
    <Label class="mt-4" fieldName="basic-company" value="Company" />
    {#if draft.company}
      <p class="text-sm text-gray-350 mt-2">(self-attested)</p>
    {/if}
  </div>

  {#if draft.company}
    <Input
      fluid
      name="basic-company"
      class="mb-3"
      value={draft.company}
      disabled
    />
  {:else}
    <ClaimLinkInput {display} />
  {/if}

  <div class="flex justify-between items-center">
    <Label class="mt-4" fieldName="basic-department" value="Department" />
    {#if draft.department}
      <p class="text-sm text-gray-350 mt-2">(self-attested)</p>
    {/if}
  </div>

  {#if draft.department}
    <Input
      fluid
      name="basic-department"
      class="mb-3"
      value={draft.department}
      disabled
    />
  {:else}
    <ClaimLinkInput {display} />
  {/if}

  <div class="flex justify-between items-center">
    <Label class="mt-4" fieldName="basic-role" value="Role" />
    {#if draft.role}
      <p class="text-sm text-gray-350 mt-2">(self-attested)</p>
    {/if}
  </div>

  {#if draft.role}
    <Input fluid name="basic-role" class="mb-3" value={draft.role} disabled />
  {:else}
    <ClaimLinkInput {display} />
  {/if}
</div>
