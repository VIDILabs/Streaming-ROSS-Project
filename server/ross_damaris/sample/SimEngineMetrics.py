# automatically generated by the FlatBuffers compiler, do not modify

# namespace: sample

import flatbuffers

# /// Sim engine metrics that are collected by ROSS instrumentation
class SimEngineMetrics(object):
    __slots__ = ['_tab']

    @classmethod
    def GetRootAsSimEngineMetrics(cls, buf, offset):
        n = flatbuffers.encode.Get(flatbuffers.packer.uoffset, buf, offset)
        x = SimEngineMetrics()
        x.Init(buf, n + offset)
        return x

    # SimEngineMetrics
    def Init(self, buf, pos):
        self._tab = flatbuffers.table.Table(buf, pos)

    # SimEngineMetrics
    def NeventProcessed(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(4))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Int32Flags, o + self._tab.Pos)
        return 0

    # SimEngineMetrics
    def NeventAbort(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(6))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Int32Flags, o + self._tab.Pos)
        return 0

    # SimEngineMetrics
    def NeventRb(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(8))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Int32Flags, o + self._tab.Pos)
        return 0

    # SimEngineMetrics
    def RbTotal(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(10))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Int32Flags, o + self._tab.Pos)
        return 0

    # SimEngineMetrics
    def RbPrim(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(12))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Int32Flags, o + self._tab.Pos)
        return 0

    # SimEngineMetrics
    def RbSec(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(14))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Int32Flags, o + self._tab.Pos)
        return 0

    # SimEngineMetrics
    def FcAttempts(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(16))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Int32Flags, o + self._tab.Pos)
        return 0

    # SimEngineMetrics
    def PqQsize(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(18))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Int32Flags, o + self._tab.Pos)
        return 0

    # SimEngineMetrics
    def NetworkSend(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(20))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Int32Flags, o + self._tab.Pos)
        return 0

    # SimEngineMetrics
    def NetworkRecv(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(22))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Int32Flags, o + self._tab.Pos)
        return 0

    # SimEngineMetrics
    def NumGvt(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(24))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Int32Flags, o + self._tab.Pos)
        return 0

    # SimEngineMetrics
    def EventTies(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(26))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Int32Flags, o + self._tab.Pos)
        return 0

    # SimEngineMetrics
    def Efficiency(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(28))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Float32Flags, o + self._tab.Pos)
        return 0.0

    # SimEngineMetrics
    def NetReadTime(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(30))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Float32Flags, o + self._tab.Pos)
        return 0.0

    # SimEngineMetrics
    def NetOtherTime(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(32))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Float32Flags, o + self._tab.Pos)
        return 0.0

    # SimEngineMetrics
    def GvtTime(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(34))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Float32Flags, o + self._tab.Pos)
        return 0.0

    # SimEngineMetrics
    def FcTime(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(36))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Float32Flags, o + self._tab.Pos)
        return 0.0

    # SimEngineMetrics
    def EventAbortTime(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(38))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Float32Flags, o + self._tab.Pos)
        return 0.0

    # SimEngineMetrics
    def EventProcTime(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(40))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Float32Flags, o + self._tab.Pos)
        return 0.0

    # SimEngineMetrics
    def PqTime(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(42))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Float32Flags, o + self._tab.Pos)
        return 0.0

    # SimEngineMetrics
    def RbTime(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(44))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Float32Flags, o + self._tab.Pos)
        return 0.0

    # SimEngineMetrics
    def CancelQTime(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(46))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Float32Flags, o + self._tab.Pos)
        return 0.0

    # SimEngineMetrics
    def AvlTime(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(48))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Float32Flags, o + self._tab.Pos)
        return 0.0

    # SimEngineMetrics
    def VirtualTimeDiff(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(50))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Float32Flags, o + self._tab.Pos)
        return 0.0

    # SimEngineMetrics
    def CommData(self, j):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(52))
        if o != 0:
            a = self._tab.Vector(o)
            return self._tab.Get(flatbuffers.number_types.Int32Flags, a + flatbuffers.number_types.UOffsetTFlags.py_type(j * 4))
        return 0

    # SimEngineMetrics
    def CommDataAsNumpy(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(52))
        if o != 0:
            return self._tab.GetVectorAsNumpy(flatbuffers.number_types.Int32Flags, o)
        return 0

    # SimEngineMetrics
    def CommDataLength(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(52))
        if o != 0:
            return self._tab.VectorLen(o)
        return 0

def SimEngineMetricsStart(builder): builder.StartObject(25)
def SimEngineMetricsAddNeventProcessed(builder, neventProcessed): builder.PrependInt32Slot(0, neventProcessed, 0)
def SimEngineMetricsAddNeventAbort(builder, neventAbort): builder.PrependInt32Slot(1, neventAbort, 0)
def SimEngineMetricsAddNeventRb(builder, neventRb): builder.PrependInt32Slot(2, neventRb, 0)
def SimEngineMetricsAddRbTotal(builder, rbTotal): builder.PrependInt32Slot(3, rbTotal, 0)
def SimEngineMetricsAddRbPrim(builder, rbPrim): builder.PrependInt32Slot(4, rbPrim, 0)
def SimEngineMetricsAddRbSec(builder, rbSec): builder.PrependInt32Slot(5, rbSec, 0)
def SimEngineMetricsAddFcAttempts(builder, fcAttempts): builder.PrependInt32Slot(6, fcAttempts, 0)
def SimEngineMetricsAddPqQsize(builder, pqQsize): builder.PrependInt32Slot(7, pqQsize, 0)
def SimEngineMetricsAddNetworkSend(builder, networkSend): builder.PrependInt32Slot(8, networkSend, 0)
def SimEngineMetricsAddNetworkRecv(builder, networkRecv): builder.PrependInt32Slot(9, networkRecv, 0)
def SimEngineMetricsAddNumGvt(builder, numGvt): builder.PrependInt32Slot(10, numGvt, 0)
def SimEngineMetricsAddEventTies(builder, eventTies): builder.PrependInt32Slot(11, eventTies, 0)
def SimEngineMetricsAddEfficiency(builder, efficiency): builder.PrependFloat32Slot(12, efficiency, 0.0)
def SimEngineMetricsAddNetReadTime(builder, netReadTime): builder.PrependFloat32Slot(13, netReadTime, 0.0)
def SimEngineMetricsAddNetOtherTime(builder, netOtherTime): builder.PrependFloat32Slot(14, netOtherTime, 0.0)
def SimEngineMetricsAddGvtTime(builder, gvtTime): builder.PrependFloat32Slot(15, gvtTime, 0.0)
def SimEngineMetricsAddFcTime(builder, fcTime): builder.PrependFloat32Slot(16, fcTime, 0.0)
def SimEngineMetricsAddEventAbortTime(builder, eventAbortTime): builder.PrependFloat32Slot(17, eventAbortTime, 0.0)
def SimEngineMetricsAddEventProcTime(builder, eventProcTime): builder.PrependFloat32Slot(18, eventProcTime, 0.0)
def SimEngineMetricsAddPqTime(builder, pqTime): builder.PrependFloat32Slot(19, pqTime, 0.0)
def SimEngineMetricsAddRbTime(builder, rbTime): builder.PrependFloat32Slot(20, rbTime, 0.0)
def SimEngineMetricsAddCancelQTime(builder, cancelQTime): builder.PrependFloat32Slot(21, cancelQTime, 0.0)
def SimEngineMetricsAddAvlTime(builder, avlTime): builder.PrependFloat32Slot(22, avlTime, 0.0)
def SimEngineMetricsAddVirtualTimeDiff(builder, virtualTimeDiff): builder.PrependFloat32Slot(23, virtualTimeDiff, 0.0)
def SimEngineMetricsAddCommData(builder, commData): builder.PrependUOffsetTRelativeSlot(24, flatbuffers.number_types.UOffsetTFlags.py_type(commData), 0)
def SimEngineMetricsStartCommDataVector(builder, numElems): return builder.StartVector(4, numElems, 4)
def SimEngineMetricsEnd(builder): return builder.EndObject()
