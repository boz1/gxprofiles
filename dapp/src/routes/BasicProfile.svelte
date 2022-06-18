<script lang="ts">
  import {
    BasePage,
    VerificationStep,
    Input,
    Label,
    PrimaryButton,
    ExplainerToolModal,
    Tooltip,
    InfoIcon,
    VerificationDescription,
  } from 'components';
  import { claimsStream, userData, wallet, networkStr } from 'src/store';
  import type { ClaimMap } from 'src/helpers';
  import { contentToDraft } from 'src/helpers';
  import { generateSignature, signBasicProfile } from 'src/basic_profile';
  import { valueDecoder } from '@taquito/local-forging/dist/lib/michelson/codec';
  import { Uint8ArrayConsumer } from '@taquito/local-forging/dist/lib/uint8array-consumer';

  import { useNavigate } from 'svelte-navigator';
  let navigate = useNavigate();

  const verification: ClaimMap = $claimsStream;

  $: display = verification?.basic.display;

  let name = '';
  let company = '';
  let role = '';
  let department = '';

  let lock: boolean = false;
  let currentStep: number = 1;
  let toggle;
  let signature = '';

  const next = () => (currentStep = currentStep + 1);
</script>

<BasePage
  class="flex flex-grow text-white 2xl:px-32 px-4 sm:px-8 overflow-visible flex-wrap items-center justify-center pt-18 sm:pt-22 md:pt-34"
>
  <div class="flex flex-col justify-evenly w-full md:max-w-144">
    <VerificationDescription {display} />

    <VerificationStep
      step={1}
      bind:currentStep
      title="Fill in Basic Information"
      description="Self-attest as an employee."
    >
      <Label fieldName="name" value="Name" class="mt-6" />
      <Input
        bind:value={name}
        name="name"
        placeholder="Enter your Name"
        disabled={currentStep !== 1}
      />

      <Label fieldName="company" value="Company" class="mt-2" />
      <Input
        bind:value={company}
        name="company"
        placeholder="Enter your Company"
        disabled={currentStep !== 1}
      />

      <Label fieldName="department" value="Department" class="mt-2" />
      <Input
        bind:value={department}
        name="department"
        placeholder="Enter your Department"
        disabled={currentStep !== 1}
      />

      <Label fieldName="role" value="Role" class="mt-2" />
      <Input
        bind:value={role}
        name="role"
        placeholder="Enter your Role"
        disabled={currentStep !== 1}
      />

      {#if currentStep == 1}
        <PrimaryButton
          text="Submit"
          class="mt-8 lg:w-60"
          onClick={() => {
            next();
          }}
          disabled={name.length < 1 ||
            company.length < 1 ||
            role.length < 1}
        />
      {/if}

      {#if currentStep == 2}
        <ExplainerToolModal
          bind:toggle
          signature={async () => {
            let profile = {
              name,
              company,
              department,
              role,
            };

            return generateSignature(profile, $userData).then(
              ({ micheline }) => {
                let str = JSON.stringify(
                  valueDecoder(
                    Uint8ArrayConsumer.fromHexString(micheline.slice(2))
                  ).string
                );
                str = str.substring(1, str.length - 1);
                return str;
              }
            );
          }}
        />
        <div class="flex items-center flex-grow">
          <PrimaryButton
            text="Review and sign"
            class="mt-8 lg:w-60"
            onClick={() => {
              lock = true;
              let profile = {
                name,
                company,
                department,
                role,
              };
              signBasicProfile($userData, $wallet, profile)
                .then((vc) => {
                  let nextClaimMap = verification;
                  nextClaimMap.basic.preparedContent = JSON.parse(vc);
                  nextClaimMap.basic.draft = contentToDraft(
                    'basic',
                    nextClaimMap.basic.preparedContent
                  );
                  claimsStream.set(nextClaimMap);
                  navigate('/connect');
                })
                .catch(console.error)
                .finally(() => (lock = false));
            }}
            disabled={lock}
          />
          <Tooltip
            tooltip="What am I signing?"
            backgroundColor="bg-gray-370"
            textColor="text-white"
            class="mt-1 -ml-1"
          >
            <p
              class="text-gray-370 italic cursor-pointer w-4 h-4 ml-2 mt-2"
              on:click={toggle}
            >
              <InfoIcon />
            </p>
          </Tooltip>
        </div>
      {/if}
    </VerificationStep>
  </div>
</BasePage>
