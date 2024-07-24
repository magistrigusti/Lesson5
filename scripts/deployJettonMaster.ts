import { toNano } from '@ton/core';
import { JettonMaster } from '../wrappers/JettonMaster';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const jettonMaster = provider.open(await JettonMaster.fromInit());

    await provider.waitForDeploy(jettonMaster.address);

    // run methods on `jettonMaster`
}
