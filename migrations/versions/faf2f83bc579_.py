"""empty message

Revision ID: faf2f83bc579
Revises: d53c508caace
Create Date: 2023-12-04 08:01:57.080715

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'faf2f83bc579'
down_revision = 'd53c508caace'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('photo',
               existing_type=postgresql.BYTEA(),
               type_=sa.Text(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('photo',
               existing_type=sa.Text(),
               type_=postgresql.BYTEA(),
               existing_nullable=True)

    # ### end Alembic commands ###