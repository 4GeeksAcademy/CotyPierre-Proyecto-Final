"""empty message

Revision ID: d53c508caace
Revises: 7bdd4c1bc3ae
Create Date: 2023-12-03 23:50:13.645824

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd53c508caace'
down_revision = '7bdd4c1bc3ae'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('phone',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=15),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('phone',
               existing_type=sa.String(length=15),
               type_=sa.INTEGER(),
               existing_nullable=False)

    # ### end Alembic commands ###