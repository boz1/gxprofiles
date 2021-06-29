from dipdup.models import OperationData, Transaction, Origination, BigMapDiff, BigMapData, BigMapAction
from dipdup.context import HandlerContext, RollbackHandlerContext
from typing import Optional
from typing import cast


import tzprofiles_indexer.models as models

from tzprofiles_indexer.types.tzprofile.storage import TzprofileStorage


async def on_factory_origination(
    ctx: HandlerContext,
    tzprofile_origination: Origination[TzprofileStorage],
) -> None:
    originated_contract = cast(
        str, tzprofile_origination.data.originated_contract_address
    )
    index_name = f"tzprofiles_{originated_contract}"
    ctx.add_contract(
        name=originated_contract,
        address=originated_contract,
        typename="tzprofile",
    )
    ctx.add_index(
        name=index_name,
        template="tzprofiles",
        values=dict(contract=originated_contract),
    )
