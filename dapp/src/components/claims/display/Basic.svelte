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
    <Label class="mt-4" fieldName="basic-company" value="Last Name" />
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

  <div class="flex items-center justify-between">
    <div
      class="flex flex-col items-center justify-center w-32 h-32 text-center border rounded-lg border-gray-200 text-gray-350"
      class:opacity-60={true}
    >
      {#if draft.role}
        <img
          name="basic-role"
          class="object-cover object-center w-full h-full rounded-lg flex items-center justify-center"
          src={draft.role}
          alt="role"
        />
      {:else}
        <p class="m-2 italic break-words select-none">
          {'Available in '}
          <a href="/basic-profile" class="underline">
            Employee profile Information
          </a>
        </p>
      {/if}
    </div>
  </div>
</div>
